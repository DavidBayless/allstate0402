var CategoryForm = React.createClass({
  render: function() {
    return (
      <form>
        <fieldset>
          <legend>New Category Form</legend>
          <input ref='catInp' type='text' name='categoryName' placeholder='Category'></input>
          <br></br>
          <input type='submit' id='submit' value='Submit' onClick={this.clearText}></input>
        </fieldset>
      </form>
    )
  },
  clearText: function(event) {
    event.preventDefault();
    var input = this.refs.catInp.value;
    this.refs.catInp.value = "";
    this.props.onSubmit(input);
  }
});

var Product_Categories = React.createClass({
  getInitialState: function() {
    return ({
      categories: []
    })
  },
  componentDidMount: function() {
    var self = this;
    $.get('http://localhost:3000/categories', function(data) {
      console.log(data);
      self.setState({
        categories: data.map(function(category, idx) {
          return <Category name={category.name} key={idx}/>
        })
      })
    })
  },
  render: function() {
    return (
      <div>
        <CategoryForm onSubmit={this.submitty}></CategoryForm>
        <ProductForm></ProductForm>
        <span class='category'></span>
        <ul>{this.state.categories}</ul>
      </div>
    )
  },
  submitty: function(input) {
    console.log(input);
    var self = this;
    // this.refs.category.innerText = input;
    $.post('http://localhost:3000/categories/new', {name: input}, function(data) {
      console.log(data);
      self.rephresh();
    });
  },
  rephresh: function() {
    var self = this;
    $.get('http://localhost:3000/categories', function(data) {
      console.log(data);
      self.setState({
        categories: data.map(function(category, idx) {
          return <Category name={category.name} key={idx}/>
        })
      })
    })
  }
})
var ProductForm = React.createClass({
  render : function(){
    return (
      <form>
        <fieldset>
          <legend>New Product Form</legend>
          <input type ="text" name="name"></input>
        </fieldset>
      </form>
    )
  }
})
var Category = React.createClass({
  render: function() {
    return (
      <li name='category'>{this.props.name}</li>
    )
  }
})
ReactDOM.render(<Product_Categories/>, document.querySelector('#gerbilville'));
