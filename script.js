const mongoose = require("mongoose");
const fs = require("fs");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/EcommerceApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Call function to insert all data once connected
    insertAllData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Async Function to Insert multiple
async function insertData(schemaModel, jsonFile) {
  try {
    // Load JSON data from the file
    const jsonData = JSON.parse(fs.readFileSync(jsonFile));

    // Insert data into the collection using insertMany
    await schemaModel.insertMany(jsonData);
    console.log(`Data from "${jsonFile}" inserted successfully!`);
  } catch (err) {
    console.error(`Error inserting data from "${jsonFile}":`, err);
  }
}

//User Schema
const userSchema = mongoose.Schema(
    {
        _id : { type: String, require: true},
        username: { type: String, required: true },
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        isActive:{ type: Boolean, default: true },
        createdTs: { type: Date, default: new Date() },
        updatedTs: { type: Date, default: new Date() }
    }
);
const userModel = mongoose.model("user", userSchema);

//User Session Schema
const userSessionSchema = mongoose.Schema(
    {
        _id : { type: String, require: true},
        userId: { type: String, required: true },
        sessionToken: { type: String, default: null },
        isActive:{ type: Boolean, default: true },
        createdTs: { type: Date, default: new Date() },
        updatedTs: { type: Date, default: new Date() }
    }
)
const userSessionModel = mongoose.model("userSession", userSessionSchema);

const categorySchema = mongoose.Schema({
    _id : { type: String, require: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdTs: { type: Date, default: new Date() },
    updatedTs: { type: Date, default: new Date() }
});

const categoryModel = mongoose.model("category", categorySchema);

const productSchema = mongoose.Schema(
    {
        _id : { type: String, require: true},
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        quantityInStock: { type: Number, required: true },
        image: { type: String, required: true },
        categoryId:{ type: String, required: true },
        isActive: { type: Boolean, default: true },
        createdTs: { type: Date, default: new Date() },
        updatedTs: { type: Date, default: new Date() }
    }
);

const productModel = mongoose.model('product', productSchema);

const cartSchema = mongoose.Schema({
    _id : { type: String, require: true},
    userId: { type: String, required: true },
    orderTotalPrice: { type: Number, required: true },
    products: { type: Object, require : true },
    isActive: { type: Boolean, default: true },
    createdTs: { type: Date, default: new Date() },
    updatedTs: { type: Date, default: new Date() },
  });
  
const cartModel = mongoose.model("cart", cartSchema);

const orderSchema = mongoose.Schema({
    _id : { type: String, require: true},
    userId: { type: String, required: true },
    status: { type: String, default: "PROCESSING" },
    orderTotalPrice: { type: Number, required: true },
    products: { type: Object, require : true },
    shippingDetails: { 
        email: { type: String, required: true },
        address: { type: String, required: true },
        phoneNo: { type: String, required: true }
    },
    isActive: { type: Boolean, default: true },
    createdTs: { type: Date, default: new Date() },
    updatedTs: { type: Date, default: new Date() },
  });
  
  const orderModel = mongoose.model("order", orderSchema);


async function insertAllData() {
  try {
    await insertData(userModel, "data/user.json");
    await insertData(userSessionModel, "data/userSession.json");
    await insertData(categoryModel, "data/category.json");
    await insertData(productModel, "data/product.json");
    await insertData(cartModel, "data/cart.json");
    await insertData(orderModel, "data/order.json");
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('Connection closed');
  }
}