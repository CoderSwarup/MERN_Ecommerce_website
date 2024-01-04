class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //category price filterration
  filter() {
    const querycopy = { ...this.queryStr };

    //remove some field fo category
    const removefield = ["keyword", "page", "limit"];
    removefield.forEach((key) => {
      delete querycopy[key];
    });
    // console.log(querycopy);

    //filterv For Price
    let queryStr = JSON.stringify(querycopy);

    // console.log(queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultperPage) {
    const currPage = Number(this.queryStr.page) || 1;

    const skipPage = resultperPage * (currPage - 1);

    this.query = this.query.limit(resultperPage).skip(skipPage);
    return this;
  }
}

export default ApiFeatures;
