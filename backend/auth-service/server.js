const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT, () => {
    console.log(`🚀Auth & User Service running on port ${process.env.PORT}`);
});
