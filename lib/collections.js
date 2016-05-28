Data = new Mongo.Collection('data');
Data.attachSchema(new SimpleSchema({
    name: {
        type: String
    },
    quiz: {
        type: Array,
        optional: true,
        minCount: 0,
        maxCount: 5
    },
    "quiz.$": {
        type: Object,
        optional: true
    },
    "quiz.$.score": {
        type: Number
    },
    "quiz.$.ratio": {
        type: Number
    },
    homework: {
        type: Array,
        optional: true,
        minCount: 0,
        maxCount: 5
    },
    "homework.$": {
        type: Object,
        optional: true
    },
    "homework.$.score": {
        type: Number
    },
    "homework.$.ratio": {
        type: Number
    },
    midterm: {
        type: Array,
        optional: true,
        minCount: 1,
        maxCount: 2
    },
    "midterm.$": {
        type: Object,
        optional: true
    },
    "midterm.$.score": {
        type: Number
    },
    "midterm.$.ratio": {
        type: Number
    },
    final: {
        type: Array,
        optional: true,
        minCount: 1,
        maxCount: 1
    },
    "final.$": {
        type: Object,
        optional: true
    },
    "final.$.score": {
        type: Number
    },
    "final.$.ratio": {
        type: Number
    }
}));
