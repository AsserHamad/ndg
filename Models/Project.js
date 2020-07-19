var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
Categories:
0 - Urban Design
    0 - Urban Design
    1 - Landscape
1 - Master Planning
    2 - Urban Planning
    3 - Housing
2 - Architecture
    4 - Interior Design
    5 - Architecture
*/
var projectSchema = new Schema({
    title: {
      en: {
        type: String,
        required: true
      },
      ar: {
        type: String,
        required: true
      }
    },
    description: {
      en: String,
      ar: String
    },
    location: {
      en: String,
      ar: String
    },
    owner: {
      en: String,
      ar: String
    },
    area: Number,
    builtupArea: Number,
    year: String,
    preview: String,
    videoPreview: String,
    category: Number,
    subcategory: Number,
    images: [String],
    videos: [String]
});

/*
  [{
    title: {
      en: "SunPark (Maasara)"
      ar:  "سان بارك (المعصرة)"
    },
    description: {
      en: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      ar: "مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة"
    },
    location: {
      en: "Cairo",
      ar: "القاهرة"
    },
    owner: {
      en: "Al Ahsan Enterprises",
      ar: "شركة الاحسن المحدودة"
    },
    area: 1900,
    builtUpArea: 37000,
    year: "2007",
    preview: "",
    category: 0,
    subcategory: 0,
    images: [],
    videos: []
  },{
    title: {
      en: "AlAqeer archeologyDistrict"
      ar:  "العقير الأثرية"
    },
    description: {
      en: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      ar: "مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة مخقثة هحسعة"
    },
    location: {
      en: "Cairo",
      ar: "القاهرة"
    },
    owner: {
      en: "Al Ahsan Enterprises",
      ar: "شركة الاحسن المحدودة"
    },
    area: 1900,
    builtUpArea: 37000,
    year: "2007",
    preview: "",
    category: 0,
    subcategory: 0,
    images: [],
    videos: []
  }]
*/

//Checking for duplicate titles
// projectSchema.pre('save', function(next){
//   console.log('currently saving project')
//   projectModel.findOne(
//     {$or: [
//       {title: {en: this.title.en}},
//       {title: {ar: this.title.ar}}
//   ]}, function(err, project) {
//     console.log(project);
//     console.log(err);
//     if(!project)
//       return next();
//     else return next(new BaseError("Project title already exists", 400));
//   })
// })

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;