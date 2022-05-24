const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    const breare = req.headers["authorization"];
    if (breare) {
      const token_ = breare.split(" ")[1];
      try {
        const user = jwt.verify(token_, "dontkeepweakpasswordkeepstrongpasswordlikecrypto");
         
        req.user = user.user;
        console.log("Middleware," , user)
        next();
      } catch (error) {
        res.status(401);
      }
    } else {
      res.send(403);
    }
  }


  async function create_token(user, res) {
    try {
      const toke =   jwt.sign({ user }, "dontkeepweakpasswordkeepstrongpasswordlikecrypto", { expiresIn: "10m" });
   
      return toke;
    } catch (error) {
      res.json({ msg: error });
    }
  }

  module.exports ={ verifyToken:verifyToken , create_token:create_token}