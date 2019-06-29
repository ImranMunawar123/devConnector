var xlsx = require("node-xlsx").default;
const Place = require("./models/Location");
var slice = require("array-slice");
var fs = require("file-system");

const importPlaces = async () => {
  try {
    // const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
    await fs.recurse("../devConnector/files", async function(
      filepath,
      relative,
      filename
    ) {
      const workSheetsFromFile = await xlsx.parse(
        "../devConnector/files/" + filename
      );

      for (file of workSheetsFromFile) {
        let data = file["data"];

        let records = slice(data, 1);

        for (record of records) {
          let price = 0;
          let coordinates = record[7].split(",");
          if (record[10]) {
            price = record[10].replace("Â£", "");
          }
          const place = await Place.findOne({ uniqueNumber: record[0] });
          // console.log(place);
          if (!place) {
            const newPlace = new Place({
              uniqueNumber: record[0],
              category: record[1],
              placeName: record[2],
              displayImage: record[3],
              galleryImages: record[4],
              phoneNumber: record[5],
              address: record[6],
              location: {
                coordinates: [Number(coordinates[0]), Number(coordinates[1])]
              },
              city: record[8],
              country: record[9],
              price: price,
              facilities: record[11],
              webURL: record[12],
              rating: record[13]
            });

            await newPlace.save();
          }
        }
      }
    });

    res.status(200).json({ msg: "Records added successfully" });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = importPlaces;
