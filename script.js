class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
          currentPage: "Pages",
          filterSize:"Small",
          currentLanguage:"All",
          currentLibrary:"All",
      }
      this.handlePageBtn=this.handlePageBtn.bind(this);
      this.handleFilterBar=this.handleFilterBar.bind(this);
      this.handleLanguage=this.handleLanguage.bind(this);
      this.handleLibrary=this.handleLibrary.bind(this);
    }


    handlePageBtn(event){
         this.setState({
            currentPage: event.target.text.replace(/\s/g, ''),
         })
         if(event.target.text == "Pages"){
            this.setState({
                filterSize:"Small"
            })
         }
    }

    handleFilterBar(event){
        if(event.currentTarget.id == "filter-small"){
            this.setState({
                filterSize:"Large",
            });
        }else{
            this.setState({
                filterSize:"Small",
            });
        }  
    }

    handleLanguage(event){
        this.setState({
            currentLanguage: event.currentTarget.value,
        });
    }

    handleLibrary(event){
        this.setState({
            currentLibrary: event.target.value,
        });
    }

    render(){
    const showfilter = () => (this.state.filterSize == "Large")?
    <FilterLarge 
    currentLanguage={this.state.currentLanguage}
    currentLibrary={this.state.currentLibrary}
    handleFilterBar={this.handleFilterBar}
    handleLanguage={this.handleLanguage}
    handleLibrary={this.handleLibrary}
    />: 
    <FilterSmall 
    currentLanguage={this.state.currentLanguage}
    currentLibrary={this.state.currentLibrary}
    handleFilterBar={this.handleFilterBar}
    />;
    const headerClass = (this.state.currentPage=="Pages" && this.state.filterSize == "Large")? "header-filter-large":"";
        return(
            <div>
                <header className={headerClass}>
                <HeaderLarge 
                currentPage={this.state.currentPage}
                handlePageBtn={this.handlePageBtn}
                /> 
                {(this.state.currentPage=="Pages")?showfilter():null}
                
                   
                </header>
                <main>

                </main>
            </div>
        )
    }
}

class HeaderLarge extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        let liClass = btnText => (this.props.currentPage==btnText)?"nav-active nav-li":"nav-inactive nav-li";
        return(
                <div id="header-large" className="nav-bar">
                    <h1>Portfolio of <b>WY Chan</b></h1>
                    <ul className="nav-ul">
                        <li className={liClass("Pages")}><a href="#pages" className="nav-btn" onClick={this.props.handlePageBtn}>Pages</a></li>
                        <li className={liClass("Layouts")}><a href="#layouts" className="nav-btn" onClick={this.props.handlePageBtn}>Layouts</a></li>
                        <li className={liClass("Certificates")}><a href="#certificates" className="nav-btn" onClick={this.props.handlePageBtn}>Certificates</a></li>
                        <li className={liClass("AboutMe")}><a href="#about-me" className="nav-btn" onClick={this.props.handlePageBtn}>About Me</a></li>
                    </ul>
                </div>
        )
    }
 }

 class HeaderSmall extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        let liClass = btnText => (this.props.currentPage==btnText)?"nav-active nav-li":"nav-inactive nav-li";
        return(
            <div id="header-small"  className="nav-bar">
                <div className="header-content">
                    <h1><b>WY Chan</b>'s Portfolio</h1>
                    <ul className="nav-ul">
                    <li className={liClass("Pages")}><a href="#pages" className="nav-btn" onClick={this.props.handlePageBtn}>Pages</a></li>
                        <li className={liClass("Layouts")}><a href="#layouts" className="nav-btn" onClick={this.props.handlePageBtn}>Layouts</a></li>
                        <li className={liClass("Certificates")}><a href="#certificates" className="nav-btn" onClick={this.props.handlePageBtn}>Certificates</a></li>
                        <li className={liClass("AboutMe")}><a href="#about-me" className="nav-btn" onClick={this.props.handlePageBtn}>About Me</a></li>
                    </ul>
                </div>
            </div>
        )
    }
 }

 const Language = (props) => (props.currentLanguage == "All")? "All Language" : props.currentLanguage;
 const Library = (props) => (props.currentLibrary == "All")? "All Libraries" : props.currentLibrary;

 class FilterSmall extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
       

        return(
            <button 
            id="filter-small"  
            className="filter-bar filter-arrow-btn" 
            onClick={this.props.handleFilterBar}
            >
                <div className="filter-content filter-content-small">
                    <div className="arrow-text">
                    <span className="material-icons-outlined">
                    keyboard_double_arrow_down
                    </span>
                    <span>Filter:</span>
                    </div>
                    <span className="filter-tag"><Language currentLanguage={this.props.currentLanguage}/></span>
                    <span className="filter-tag"><Library currentLibrary={this.props.currentLibrary}/></span>
                </div>
            </button>
        )
    }
 }


class FilterLarge extends React.Component{
   constructor(props){
     super(props);
   }
   render(){

    const langClass = text => (this.props.currentLanguage == text)? "filter-active": "filter-inactive";
    const libClass = text => (this.props.currentLibrary == text)? "filter-active": "filter-inactive";

       return(
           <div className="filter-bg">
            <div id="filter-large"  className="filter-bar filter-bar-large">
                <div className="filter-content filter-content-large">
                    <span className="filter-text">Filter</span>
                    <div className="filter-btn-gp">
                        <div className="filter-btns">
                           <h2>Languages:</h2>
                           <ul className="filter-ul">
                               <li className={langClass("All")}><button value="All" className="filter-btn" onClick={this.props.handleLanguage}>All</button></li>
                               <li className={langClass("CSS")}><button  value="CSS" className="filter-btn" onClick={this.props.handleLanguage}>CSS</button></li>
                               <li className={langClass("HTML")}><button  value="HTML" className="filter-btn" onClick={this.props.handleLanguage}>HTML</button></li>
                               <li className={langClass("JavaScript")}><button  value="JavaScript" className="filter-btn" onClick={this.props.handleLanguage}>JavaScript</button></li>
                           </ul>
                        </div>
                        <div className="filter-btns">
                           <h2>Libraries:</h2>
                           <ul className="filter-ul">
                               <li className={libClass("All")}><button value="All" className="filter-btn" onClick={this.props.handleLibrary}>All</button></li>
                               <li className={libClass("jQuery")}><button value="jQuery" className="filter-btn" onClick={this.props.handleLibrary}>jQuery</button></li>
                               <li className={libClass("React")}><button value="React" className="filter-btn" onClick={this.props.handleLibrary}>React</button></li>
                               <li className={libClass("BootStrap")}><button value="BootStrap" className="filter-btn" onClick={this.props.handleLibrary}>BootStrap</button></li>
                           </ul>
                        </div>
                    </div>
                    
                </div>
                <button 
                id="filter-btn-large" 
                className="filter-arrow-btn filter-arrow-btn-large"
                onClick={this.props.handleFilterBar}
                >
                    <div className="arrow-text">
                        <span className="material-icons-outlined arrow-up">
                            east
                        </span>
                        <span>Search</span>
                    </div>
                </button>
            </div>
            </div>
       )
   }
}

ReactDOM.render(<MyApp />, document.getElementById('myApp'));