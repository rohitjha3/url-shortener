const express = require('express');
const path = require('path');
require("dotenv").config();
const URL = require("./models/url");
const cookieParser = require('cookie-parser');
// const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth');
const {checkForAuthentication,restrictTo} = require('./middlewares/auth');
const {connectMongoDb} = require("./connection");

const app = express();
const PORT = 8001;

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require('./routes/user');

connectMongoDb(process.env.MONGO_URI)
.then(() => console.log("mongoDb connected"))

app.set('view engine', 'ejs');

app.set('views', path.resolve('./views'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(checkForAuthentication);

//app.use('/url',restrictToLoggedinUserOnly,urlRoute);   // inline middleware hai ye

app.use('/url', restrictTo(["NORMAL","ADMIN"]), urlRoute); 
app.use('/user',userRoute);
app.use("/", staticRoute);

app.get('/:shortId', async (req,res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }

  );

  if (!entry) {
  return res.status(404).send("Short URL not found");
}

   res.redirect(entry.redirectURL);
 
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));