"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        return {
            author : {id: '', firstName: '', lastName: ''},
            errors: {}
        };
    },

    setAuthorState: function(event){        
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field]= value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function() {
        var formIsvalid = true;
        this.state.errors = {}; //clear any previous errors

        if(this.state.author.firstName.length < 3){
            this.state.errors.firstName = 'First name should be atleast 3 characters.';
            formIsvalid = false;
        }

        if(this.state.author.lastName.length < 3){
            this.state.errors.lastName = 'Last name should be atleast 3 characters.';
            formIsvalid = false;
        }

        this.setState({errors: this.state.errors});

       return formIsvalid;
    },

    saveAuthor: function(event){
        event.preventDefault();

        if(!this.authorFormIsValid()){
            return;
        }

        AuthorActions.createAuthor(this.state.author);
        toastr.success('Author saved!');
        this.transitionTo('authors');
    },

    render: function(){
        return (                  
            <AuthorForm author={this.state.author} 
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors}
            />              
        );
    }  
});

module.exports = ManageAuthorPage;