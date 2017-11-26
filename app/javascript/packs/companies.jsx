import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class CompanySection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            newCompany: {
                name: ''
            },
            editCompany: {
                id: null,
                name: ''
            },
            isCreating: false,
            isEditing: false
        }
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleEditTextInput = this.handleEditTextInput.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleCreate = this.toggleCreate.bind(this);
    }

    componentDidMount() {
        axios.get('/companies.json')
            .then(res => this.setState({ companies: res.data }))
    }

    handleTextInput(e) {
        this.setState({ newCompany: { name: e.target.value } })
    }

    handleEditTextInput(e){
        this.setState({
            editCompany: {
                id: this.state.editCompany.id,
                name: e.target.value
            }
        })
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        axios.post('/companies', {
            name: this.state.newCompany.name
        })
            .then(() => {
                this.setState({companies: [...this.state.companies, this.state.newCompany ]})
            })
    }

    handleEditSubmit(e){
        e.preventDefault()
        axios.put(`/companies/${this.state.editCompany.id}`, {
            name: this.state.editCompany.name
        })
            .then(() => {
                this.setState({companies: [...this.state.companies, this.state.editCompany ]})
            })
            .catch(e => console.log(e))
    }

    toggleEdit({id, name}) {
        this.setState({isEditing: true, editCompany: { id, name }})
    }

    toggleCreate() {
        this.setState({isCreating: !this.state.isCreating})
    }

    renderCompanies() {
        return (this.state.companies.map(company => <li onClick={()=>{this.toggleEdit(company)}} key={company.id}>{company.name} - {company.id}</li>))
    }

    renderCreateForm() {
        return (<form onSubmit={this.handleCreateSubmit}>
                <input type='text' placeholder='Name' onChange={this.handleTextInput}/>
                <button type='submit'>Create</button>
                </form>)
    }

    renderEditForm() {
        return (
            <form onSubmit={this.handleEditSubmit}>
                <input type='text' placeholder='Name' value={this.state.editCompany.name} onChange={this.handleEditTextInput} ref='dodod'/>
                <button type='submit'>Edit Company</button>
            </form>
        )
    }

    render() {
        return(
            <div>
                <h1>Companies</h1>
                <ul>
                   {this.renderCompanies()}
                </ul>
                <button onClick={this.toggleCreate}>Create New Company</button>
                {this.state.isCreating && this.renderCreateForm()}
                {this.state.isEditing && this.renderEditForm()}
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <CompanySection/>,
        document.body.appendChild(document.createElement('div')),
    )
})