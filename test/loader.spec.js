var should = require("should");

var loader = require("../");

describe("scatter loader", function () {
    it("should throw error when output path is not absolute", function () {
        var text = 'Text <img src="image.png"><img src="~bootstrap-img"> Text';
        (function (params) {
            loader.call({
                query: "?outputPath=asfsa/dfd.ts",
                resource: "D:\\sdfsd\\sdsa\\sdd.ts",
                options: {
                    output: {
                        path: "D:\\sdfsd\\sdsa\\sdd.ts"
                    }
                },
                context: "D:\\sdfsd\\sdsa\\sdd.ts"
            }, text)
        }).should.throw();
    });
});