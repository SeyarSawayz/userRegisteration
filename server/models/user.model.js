import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const dbInstance = await mongoose.connect(
    //   `${process.env.MONGODB_URI}/user_login`
    // );
    const dbInstance = await mongoose.connect(
      "mongodb+srv://seyarsawayz:123@cluster0.t1avapb.mongodb.net/user_login"
    );
    console.log("Database connected Successfully", dbInstance.connection.host);
  } catch (error) {
    console.log(error);
  }
};

connectDB();

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const collection = mongoose.model("collection", userSchema);
