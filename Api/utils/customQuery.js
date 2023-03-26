class CustomQuery {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const per_page = this.queryString.per_page * 1 || 10;
    const skip = (page - 1) * per_page;

    this.query = this.query.skip(skip).limit(per_page);
    return this;
  }
}

module.exports = CustomQuery;
