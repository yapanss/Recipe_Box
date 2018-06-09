

class RecipeItem extends React.Component {
	constructor(props) {
		super(props)
		this.hide = this.hide.bind(this)
		this.save = this.save.bind(this)
		this.edit = this.edit.bind(this)
	}

	hide() {
		this.props.hide()
	}
	edit() {
    	this.props.edit()
  	}
	save() {
		var donnees = {
		  title : this.refs.inputTitle.value,
		  description : this.refs.inputDescription.value,
	      ingredients: this.refs.inputIngredients.value,
	      photo : this.refs.inputFile.files[0],
	      id: this.props
		  }
		  this.props.save(donnees)
	}
	

	render() {
		return(
			<div style={{width: "50%", marginLeft:"25%"}} className="mb-3">
			<div className="card">
				<div className="card-header">
					<div className="card-title">
						<h2>{this.props.currentShown.title}</h2>
					</div>
					<div className="card-subtitle">
						<p>{this.props.currentShown.description}</p>
					</div>
				</div>
				<img src={this.props.currentShown.photo} width="100%" height="200" alt="receit image" /> 
				<div className="card-footer">
					<button className="btn btn-block bg-danger text-white" onClick={this.hide}>
						Hide
					</button>
					<button className="btn btn-block bg-info text-white" data-toggle="modal" data-target="#editItem" onClick={this.edit}>
						Edit
					</button>
				</div>
			</div>

			<div id="editItem" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body">
							<form >
				    			<div className = "form-group">
				    				<label className="control-label">Title </label>
				    				<input id="editTitle" type="text" ref="inputTitle" className="form-control" defaultValue={this.props.currentShown.title} />
				    			</div>
				    			<div className = "form-group">
				    				<label className="control-label">Description</label>
				    				<input type="text" ref="inputDescription" className="form-control" defaultValue={this.props.currentShown.description} />
				    			</div>
				    			<div className = "form-group">
				                    <label className="control-label">Ingredients</label>
				                    <textarea cols="7" rows="7" type="text" ref="inputIngredients" className="form-control" defaultValue={this.props.currentShown.ingredients} />
				                </div>
				                 <div className = "form-group">
						            <label className="control-label" >Choisir une photo</label>
						            <input type="file" ref="inputFile" className="form-control-file" />
						          </div>
				    		</form>
				    		<div className="modal-footer">
								<button className="btn btn-success" data-dismiss="modal" onClick={this.save}>Save</button>
							    <button className="btn btn-default" data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}

// ****************************************************************

class RecipeForm extends React.Component {
 
constructor(props) {
	super(props)
	this.soumet = this.soumet.bind(this)
  // this.photoUpload = this.photoUpload.bind(this)
}
  
  soumet(e) {
  	e.preventDefault()
	  var donnees = [{
		  title : this.refs.inputTitle.value,
		  description : this.refs.inputDescription.value,
      ingredients: this.refs.inputIngredients.value,
      photo : this.refs.inputFile.files[0]
	  }]
	  this.props.soumet(donnees)
	}

  
  render() {
  	
    return (
    	<div className="mb-3" style={{marginLeft:"10%", marginRight:"10%"}}>
    		<button className="btn btn-block bg-primary text-white" onClick={this.props.toggleForm}>Add a new recipe</button>
    		<form style = {this.props.formDisplay}>
    			<div className = "form-group">
    				<label className="control-label">Title </label>
    				<input type="text" ref="inputTitle" className="form-control"/>
    			</div>
    			<div className = "form-group">
    				<label className="control-label">Description</label>
    				<input type="text" ref="inputDescription" className="form-control"/>
    			</div>
    			<div className = "form-group">
                    <label className="control-label">Ingredients</label>
                    <textarea cols="10" rows="10" type="text" ref="inputIngredients" className="form-control"/>
          </div>
          <div className = "form-group">
            <label className="control-label" >Choisir une photo</label>
            <input type="file" ref="inputFile" className="form-control-file" />
          </div>
    			<button className="btn btn-success" onClick={this.soumet}>Add</button>
    		</form>
    	</div>
    )
  }
}

// *************************************************************************

class RecipeLi extends React.Component {

	constructor(props) {
		super(props)
		this.erase = this.erase.bind(this)
    	this.toggleModal = this.toggleModal.bind(this)
    	this.togglePopover = this.togglePopover.bind(this)
    	this.edit = this.edit.bind(this)
    	this.show = this.show.bind(this)

	}

	show() {
		this.props.show(this.props.index)
	}
	togglePopover() {
		
		this.props.togglePopover(this.props.index)
	}
	toggleModal(e) {
		console.log(e.target)
		this.props.toggleModal()
	}
	erase() {
   	 this.props.erase(this.props.index)
  	}
  
 	edit() {
    	this.props.edit(this.props.index)
  	}

	render() {

		return(
			
				<div>
					
					<li style={{
								
								marginBottom: "15px"
								
								}}
						>
						<div className="row">
							<p className="col-9 text-center bg-warning" onClick={this.show} style={{cursor: "pointer", fontSize: "1.7em", 
								color: "white"}}>{this.props.recipe.title}</p>
							<button className="btn  col-3 sm bg-danger text-white" style={{marginBottom: "15px"}} onClick={this.erase}>Remove</button>
						</div>
						
					</li>

      						
				</div>

		)
	}
}


// ************************************************************

class RecipeCo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			formDisplay : false,
			recipes:[],
			currentEdited:{},
			currentShown: {},
			showItem: false,
			id: 0,
			photoUrl:""
		}
		this.toggleForm = this.toggleForm.bind(this)
		this.soumet = this.soumet.bind(this)
		this.erase = this.erase.bind(this)
   		// this.photoUpload = this.photoUpload.bind(this)
   		this.togglePopover = this.togglePopover.bind(this)
   		this.edit = this.edit.bind(this)
   		this.show = this.show.bind(this)
   		this.hide = this.hide.bind(this)
   		this.save = this.save.bind(this)
   		this.close = this.close.bind(this)
   		this.getBase64 = this.getBase64.bind(this)
	}

	close() {
		this.setState({ modal: false })
	}

	soumet(donnees) {
		donnees[0].id = this.state.id++
		console.log(donnees[0])
		if(!donnees[0].photo) {
	    	let recip = [...this.state.recipes, ...donnees]
			localStorage.setItem('recipes', JSON.stringify(recip))
			localStorage.setItem('ids', JSON.stringify(this.state.id++))
			this.setState({
				recipes: recip,
				id: this.state.id++
			})
		
	    } else {
	    	this.getBase64(donnees[0].photo).then(base64 => {
			donnees[0].photo = base64
			let recip = [...this.state.recipes, ...donnees]
			localStorage.setItem('recipes', JSON.stringify(recip))
			localStorage.setItem('ids', JSON.stringify(this.state.id++))
			this.setState(
				{recipes: recip}
			)
		})
	    }
		
	}

	save(donnees) {
		donnees.id = this.state.currentEdited.id
	    if(!donnees.photo) {
	    	donnees.photo = this.state.currentEdited.photo
	    	let recip = this.state.recipes.map((item) => item.id == donnees.id ? donnees : item )
			localStorage.setItem('recipes', JSON.stringify(recip))
	    
		this.setState(prevState=>({
				recipes: prevState.recipes.map((item) => item.id == donnees.id ? donnees : item )
			})
		)
	    } else {this.getBase64(donnees.photo).then(base64 => {
			donnees.photo = base64
			let recip = this.state.recipes.map((item) => item.id == donnees.id ? donnees : item )
			localStorage.setItem('recipes', JSON.stringify(recip))
	    
		this.setState(prevState=>({
				recipes: prevState.recipes.map((item) => item.id == donnees.id ? donnees : item )
			})
		)
		})
		}
	}

	togglePopover(i) {
		this.setState({
     		 popoverOpen: !this.state.popoverOpen,
			 currentEdited: this.state.popoverOpen == false ? this.state.recipes[i] : {}
     		 
    	});
	}

	getBase64(file) {
  			return new Promise((resolve,reject) => {
		     const reader = new FileReader();
		     reader.onload = () => resolve(reader.result);
		     reader.onerror = error => reject(error);
		     reader.readAsDataURL(file);
		  	});
	}

	erase(i) {
		let recip = this.state.recipes.filter((item)=>item != this.state.recipes[i])
		this.setState(prevState=>({
				recipes: prevState.recipes.filter((item)=>item != prevState.recipes[i])
			})
		)
		localStorage.setItem('recipes', JSON.stringify(recip))
	}
	edit() {
		this.setState({ 
			currentEdited: this.state.currentShown,

		 })
	
	}

	hide() {
		this.setState({
			currentShown: {},
			showItem: false
		})
	}
	show(i) {
		this.setState({ 
			currentShown: this.state.recipes[i],
			currentEdited: this.state.recipes[i],
			showItem: true
			
		 })
	}

	toggleForm() {
		this.setState({
			formDisplay: !this.state.formDisplay,
		 	showItem: false,
		    currentShown: {}
		    }
		)

 	}
   
 	
 	componentWillMount() {
 		$('body').css({backgroundColor : "#708090" })
 	}
 	componentDidMount() {

 		this.setState({
 			recipes:!localStorage.getItem('recipes') ? [] : JSON.parse(localStorage.getItem('recipes')),
 			id: !localStorage.getItem('ids') ? 0 : parseInt(localStorage.getItem('ids'))
 		})
 		alert(localStorage.getItem('recipes'))

 	}

	render() {
	  	var formStyle = this.state.formDisplay ? {display : 'block'} : {display : 'none'}
	  	var displayItem = !this.state.showItem ? <div></div> : <RecipeItem 	
	  																currentShown={this.state.currentShown}
	  																hide={this.hide}
	  																save={this.save}
	  																edit={this.edit}>
	  															</RecipeItem>
	  	let displayList = this.state.recipes.length == 0 ? <div></div> : this.state.recipes.map((item, i)=>
						
						<RecipeLi recipe={item} 
									key={i} 
									index={i}  
									erase={this.erase}
									toggleModal={this.toggleModal}
									togglePopover={this.togglePopover}
									modal={this.state.modal}
									edit={this.edit}
									save={this.save}
									show={this.show}
									displayItem={displayItem}>
							
						</RecipeLi>)
		return(
			<div className="container mt-5 mb-5">
			<h1 className="text-center  mb-5 text-white">MyRecipeBox</h1>
			
				<RecipeForm formDisplay={formStyle} 
							toggleForm={this.toggleForm} 
							hide={this.hide} 
							soumet={this.soumet}>
								
				</RecipeForm>
				<div className="row">
				{displayItem}
				<ul style={{width: "75%", listStyle:"none", marginLeft:"11%"}}>
					{displayList}
				</ul>
				</div>				
			



			</div>
		)
	}
}

// *********************************************************************

ReactDOM.render(

  <RecipeCo />,
  
  document.getElementById('root')
)
