const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
  {
    uniqueNumber: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    placeName: {
      type: String,
      required: true
    },
    facilities: {
      type: Array,
      requird: true
    },
    displayImage: {
      type: String,
      default: null
    },
    galleryImages: {
      type: Array,
      default: null
    },
    phoneNumber: {
      type: Number,
      default: null
    },
    address: {
      type: String,
      requird: true
    },
    webURL: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    rating: {
      type: Number,
      default: null
    },
    city: {
      type: String,
      requird: true
    },
    country: {
      type: String,
      requird: true
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"]
      },
      coordinates: []
    }
  },
  {
    timestamps: true
  }
);

placeSchema.index({ location: "2dsphere" });
const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
