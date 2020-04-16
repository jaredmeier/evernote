import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        // debugger
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.state = {
            accountDropdown: "hidden",
            notebookDropdown: "hidden",
            tagDropdown: "hidden"
        };
    }

    componentDidMount() {
        // console.log("Nav fetching notebooks")
        if (this.props.match.path === "/notes") {
            this.setState({
                notebookDropdown: "hidden"
            })
        } else {
            this.setState({
                notebookDropdown: ""
            })
        }
        this.props.fetchNotebooks();
        this.props.fetchTags();
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    handleNewNote(e) {
        e.preventDefault;
        let notebookId = null;
        if (this.props.match.params.notebookId) {
            notebookId = this.props.match.params.notebookId;
            this.props.createNewNote(notebookId).then((action) => this.props.history.push(`/notebooks/${notebookId}/${action.note.id}`));
        } else {
            notebookId = this.props.notebooks[0].id;
            this.props.createNewNote(notebookId).then((action) => this.props.history.push(`/notes/${action.note.id}`));
        }
    }

    toggleHidden(dropdown) {
        this.state[dropdown] === "hidden" ?
            this.setState({ [dropdown]: "" }) : this.setState({ [dropdown]: "hidden" });
    }

    render() {
        const { currentUser, notebooks, tags } = this.props;
        const { notebookDropdown, accountDropdown, tagDropdown } = this.state;
        const notebookList = notebooks.map( notebook => {
            return (
                <div className="nav-hover-notebook" key={notebook.id}>
                    <Link to={`/notebooks/${notebook.id}`}>
                        <li key={notebook.id}>{notebook.name}</li>
                    </Link>
                </div>
            )
        });
        const tagList = tags.map(tag => {
            return (
                <div className="nav-hover-notebook" key={tag.id}>
                    <button>
                        <li key={tag.id}>{tag.name}</li>
                    </button>
                </div>
            )
        });
        return (
            <>
                <div className="main-nav-container">
                    <div className="nav-profile">
                        <button className="account-dropdown-button" onClick={() => this.toggleHidden("accountDropdown")}>
                            <i className="fas fa-user-circle account-icon" ></i> 
                            {currentUser.email}
                            <i className="fas fa-angle-down dropdown-caret-icon"></i>
                        </button>
                        <ul className={`account-dropdown dropdown ${accountDropdown}`}>
                            <li><button>Other option</button></li>
                            <li><button>Other option</button></li>
                            <li><button onClick={this.handleLogout}>Sign out {currentUser.email}</button></li>
                        </ul>
                    </div>
                    <div className="nav-search">
                        <i className="fas fa-search nav-icon"></i>
                        Don't Search
                    </div>
                    <button className="nav-new-note" onClick={this.handleNewNote}>
                        <i className="fas fa-plus-circle add-note-icon"></i>
                        <h4>New Note</h4>
                    </button>

                    <ul className="main-nav-links">
                        <li>
                            <div className="nav-hover-container">
                                <div></div>
                                <Link to="/notes" className="main-nav-link">
                                    <i className="fas fa-sticky-note nav-icon"></i>
                                    <h4>All Notes</h4>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="nav-hover-container">
                                <button className="caret-dropdown-button" onClick={() => this.toggleHidden("notebookDropdown")} >
                                    <i className={`fas fa-caret-right nav-icon 
                                    ${notebookDropdown === "" ? "open" : ""}`}></i>
                                </button> 
                                <Link to="/notebooks" className="main-nav-link">
                                    <i className="fas fa-book-open nav-icon"></i>
                                    Notebooks
                                </Link>
                            </div>
                            <ul className={`nav-notebook-list ${notebookDropdown}`}>
                                {notebookList}
                            </ul>
                        </li>
                        <li>
                            <div className="nav-hover-container"> 
                                <div></div>
                                <Link to="/" className="main-nav-link">
                                    <i className={`fas fa-tag nav-icon`}></i>
                                    <h4>Tags</h4>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default Nav;

//tombstone account icon
//<img src={window.iconURL} className="account-icon" />
