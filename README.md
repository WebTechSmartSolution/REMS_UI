# Issues In this project need to Handled 
`````
--need to solve the API call and data representation...
--chat functionality is still remaining to implement...

`````




# REMS_UI
This repo contain all the required UI updated and final change of UI code
# This steps are for payment gateway adding using BrainTree


## install these npm packages
```
npm i braintree-web-drop-in-react-updated
npm i braintree
```
# Add this in frontend

```
import DropIn from "braintree-web-drop-in-react-updated";

```
```
 const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
```

```
 const getToken = async () => {
    try {
      console.log("called");
      const { data } = await axios.get(
        `${API_URL}/api/reservation/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePaySubmit = async () => {
    try {
      console.log("called");
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${API_URL}/api/reservation/braintree/payment`,
        {
          reservartionId: spaceId,
          totalPrice: price,
          nonce,
        },
        config
      );
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
```

```
 <div className="payment_card">
                <p>All payments are secure and encrypted.</p>
                {clientToken ? (
                  <>
                    <DropIn
                      options={{ authorization: clientToken }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  </>
                ) : (
                  <h3>Loading payment methods...</h3>
                )}
```


# Add this in backend

```
const order = require("../models/OrderModel");
var braintree = require("braintree");
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.Merchant_ID,
  publicKey: process.env.Public_Key,
  privateKey: process.env.Private_Key,
});
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send(response);
      }
    });
  } catch (error) {}
};
const braintreePaymentController = async (req, res) => {
  try {
    const { reservartionId, totalPrice, nonce } = req.body;
    let newTranction = gateway.transaction.sale(
      {
        amount: totalPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          const orders = new order({
            reservartionId,
            userId: req.user.id,
            totalAmount: totalPrice,
            status: "completed",
          }).save();
          res.status(200).send(result);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
```
