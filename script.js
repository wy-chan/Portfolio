
class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
          currentPage: "AboutMe",
          firstLoad:true,
          headerSize:"Large",
          filterSize:"Small",
          currentLanguage:"All",
          currentLibrary:"All",
          selectLanguage:"All",
          selectLibrary:"All",
          projects:[],
          certificates:[],
          projectsSorted:[],
      }
      this.handlePageBtn=this.handlePageBtn.bind(this);
      this.handleFilterBar=this.handleFilterBar.bind(this);
      this.handleLanguage=this.handleLanguage.bind(this);
      this.handleLibrary=this.handleLibrary.bind(this);
      this.handleProjectSearch=this.handleProjectSearch.bind(this);
      this.sortProjects=this.sortProjects.bind(this);
      this.resizeHeaderOnScroll=this.resizeHeaderOnScroll.bind(this);

    }

    componentDidMount() {
        fetch("data.json")
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                projects: json.projects,
                certificates:json.certificates,
                projectsSorted:json.projects,
            })
            console.log(this.state.certificates)
        });
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    resizeHeaderOnScroll(){
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 150;
      if (distanceY > shrinkOn) {
        this.setState({
            headerSize:"Small",
        })
      }else{
        this.setState({
            headerSize:"Large",
        })
      }
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
         if(this.state.firstLoad == true){
             this.setState({
                 firstLoad: false,
             })
         }
         window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleFilterBar(){
        if(this.state.filterSize == "Small"){
            this.setState({
                filterSize:"Large",
            });
        }else{
            this.setState({
                filterSize:"Small",
            });
        }  
        this.setState({
            selectLanguage:this.state.currentLanguage,
            selectLibrary:this.state.currentLibrary
        })
    }

    handleLanguage(event){
        this.setState({
            selectLanguage: event.currentTarget.value,
        });
    }

    handleLibrary(event){
        this.setState({
            selectLibrary: event.target.value,
        });
    }

    handleProjectSearch(){
        this.setState({
            currentLanguage:this.state.selectLanguage,
            currentLibrary:this.state.selectLibrary
        });
        this.handleFilterBar();
        this.sortProjects();
    }

    sortProjects(){
        let newList = this.state.projects.filter(item=> item.tag.indexOf(this.state.selectLanguage) >=0 && item.tag.indexOf(this.state.selectLibrary) >=0);
        console.log(newList);
        this.setState({
            projectsSorted: newList,
        })
    }

    render(){
    const showfilter = () => (this.state.filterSize == "Large")?
    <FilterLarge 
    currentLanguage={this.state.currentLanguage}
    currentLibrary={this.state.currentLibrary}
    handleFilterBar={this.handleFilterBar}
    handleLanguage={this.handleLanguage}
    handleLibrary={this.handleLibrary}
    selectLanguage={this.state.selectLanguage}
    selectLibrary={this.state.selectLibrary}
    handleProjectSearch={this.handleProjectSearch}
    />: 
    <FilterSmall 
    currentLanguage={this.state.currentLanguage}
    currentLibrary={this.state.currentLibrary}
    handleFilterBar={this.handleFilterBar}
    projectsSorted={this.state.projectsSorted}
    />;

    const showheader = () => (this.state.headerSize == "Large")?
    <HeaderLarge 
        currentPage={this.state.currentPage}
        handlePageBtn={this.handlePageBtn}
    />: 
    <HeaderSmall
        currentPage={this.state.currentPage}
        handlePageBtn={this.handlePageBtn}
    />;
    
    const headerClass = (this.state.currentPage=="Pages" && this.state.filterSize == "Large")? "header-filter-large":"";

    const toPage = () => {
        switch(this.state.currentPage){
            case "Pages": return <Pages projects={this.state.projectsSorted}/>;
            case "Layouts": return null;
            case "Certificates": return <Certificates certificates={this.state.certificates}/>;
            case "AboutMe": return <AboutMe firstLoad={this.state.firstLoad}/>;
            default: return <Pages projects={this.state.projectsSorted}/>;
        }
    }

        return(
            <div>
                <header className={headerClass}>
                    {showheader()}
                    {(this.state.currentPage=="Pages")?showfilter():<div className="header-buffer"></div>}            
                </header>

                <main>
                    {toPage()}
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
                        <li className={liClass("AboutMe")}><a href="#about-me" className="nav-btn" onClick={this.props.handlePageBtn}>About Me</a></li>
                        <li className={liClass("Layouts")}><a href="#layouts" className="nav-btn" onClick={this.props.handlePageBtn}>Layouts</a></li>
                        <li className={liClass("Pages")}><a href="#pages" className="nav-btn" onClick={this.props.handlePageBtn}>Pages</a></li>
                        <li className={liClass("Certificates")}><a href="#certificates" className="nav-btn" onClick={this.props.handlePageBtn}>Certificates</a></li>

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
                    <li className={liClass("AboutMe")}><a href="#about-me" className="nav-btn" onClick={this.props.handlePageBtn}>About Me</a></li>
                    <li className={liClass("Layouts")}><a href="#layouts" className="nav-btn" onClick={this.props.handlePageBtn}>Layouts</a></li>
                    <li className={liClass("Pages")}><a href="#pages" className="nav-btn" onClick={this.props.handlePageBtn}>Pages</a></li>
                    <li className={liClass("Certificates")}><a href="#certificates" className="nav-btn" onClick={this.props.handlePageBtn}>Certificates</a></li>
                    </ul>
                </div>
            </div>
        )
    }
 }

 const Language = (props) => (props.currentLanguage == "All")? "All Languages" : props.currentLanguage;
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
                    <span>Filter <b>({
                        (this.props.currentLanguage == "All" && this.props.currentLibrary == "All")?
                        "All": 
                        this.props.projectsSorted.length
                    })</b>:</span>
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

    const langClass = text => (this.props.selectLanguage == text)? "filter-active": "filter-inactive";
    const libClass = text => (this.props.selectLibrary == text)? "filter-active": "filter-inactive";

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
                onClick={this.props.handleProjectSearch}
                >
                    <div className="arrow-text">
                        <span className="material-icons-outlined arrow-up">
                            east
                        </span>
                        <span>Search</span>
                    </div>
                </button>
            </div>
            <button className="blank-btn" onClick={this.props.handleFilterBar}> 
            </button>
            </div>
       )
   }
}

class Pages extends React.Component{
    constructor(props){
      super(props);
    }
    render(){ 

        let data=this.props.projects;

        return(
            <section id="Pages">
                {(data[0])?
                data.map((item,index)=>{return<PageBox projects={item} key={index}/>})
                :null}
            </section>
            )
   }
}

class PageBox extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        let data = this.props.projects;
        let img = (data)?data["image"]:"";
        let title = (data)?data["title"]:"...";
        let text = (data)?data["text"]:"...";
        let demoURL = (data)?data["demoURL"]:"...";
        let codeURL = (data)?data["codeURL"]:"...";
        return(
                <div className="pages-box">
                    <div className="pages-box-content">
                        <div className="pages-img-box">
                            <img className="pages-img" src={img}/>
                            <a href={codeURL} target="_blank" className="demo-btn code-btn">See Code</a>
                        </div>
                        <h3>{title}</h3>
                        <div className="pages-desc">
                            <p className="p-text">{text}</p>
                        </div>
                        <a href={demoURL} target="_blank" className="demo-btn">See Demo</a> 
                    </div>
                </div>
        )
    }
}
class Certificates extends React.Component{
    constructor(props){
      super(props);
    }
    render(){ 

        let data=this.props.certificates;
        let dataDev = this.props.certificates.filter(item => item.type == "development");
        let dataDesign = this.props.certificates.filter(item => item.type == "design");
        let dataBack = this.props.certificates.filter(item => item.type == "development-backend");
        let dataCode = this.props.certificates.filter(item => item.type == "coding");
        

        return(
            <section id="Certificates">
                <p className="p-text">My certificates from online courses:</p>

                <h3 className="cert-type">Front End:</h3>
                <div className="certGroup">
                {(data[0])?
                dataDev.map((item,index)=><li key={index}>{<CertBox certificates={item} />}</li>)
                :null}
                </div>
                <hr />
                <h3 className="cert-type">Design:</h3>
                <div className="certGroup">
                {(data[0])?
                dataDesign.map((item,index)=><li key={index}>{<CertBox certificates={item} />}</li>)
                :null}
                </div> 
                <hr />
                <h3 className="cert-type">Back End:</h3>
                <div className="certGroup">
                {(data[0])?
                dataBack.map((item,index)=><li key={index}>{<CertBox certificates={item} />}</li>)
                :null}
                </div>
                <hr />
                <h3 className="cert-type">Coding:</h3>
                <div className="certGroup">
                {(data[0])?
                dataCode.map((item,index)=><li key={index}>{<CertBox certificates={item} />}</li>)
                :null}
                </div>

            </section>
        )
    }
}
class CertBox extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        let data = this.props.certificates;
        let img = (data)?data["image"]:"";
        let title = (data)?
            data["title"].split('\n').map((c,i) => {
            return (<span key={i}>{c}<br/></span>) 
             }):
             "...";
        let org = (data)? data.organization:"";
        let url = (data)?data["url"]:"...";
        return(
                <div className="cert-box">
                    <div className="cert-box-content">
                            <img className="cert-img" src={img}/>
                        <div className="cert-box-text">
                                 <h5>{org}</h5>
                                 <h4>{title}</h4>
                        <a href={url} target="_blank" className="demo-btn cert-btn">See Certificate</a> 
                        </div>
                    </div>
                </div>
        )
    }
}

class AboutMe extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        let classImg = (this.props.firstLoad)?"profile-img profile-img-anim":"profile-img";
        let classSB = (this.props.firstLoad)?"speech-bubble speech-bubble-anim":"speech-bubble";
        let classP1 = (this.props.firstLoad)?"p1 p1-anim":"p1";
        let classP2 = (this.props.firstLoad)?"p2 p2-anim":"p2";
        let classP3 = (this.props.firstLoad)?"p3 p3-anim":"p3";
        let classP4 = (this.props.firstLoad)?"p4 p4-anim":"p4";
        let classTriangle = (this.props.firstLoad)?"speech-bubble-triangle speech-bubble-triangle-anim":"speech-bubble-triangle";
        let classAbout = (this.props.firstLoad)?"about-info about-info-anim":"about-info";

        return(
            <section id="AboutMe">
                <div id="intro-box">
                    <div className="profile-img-div">
                    <div className={classImg}/>
                    </div>
                    <div className={classSB}>
                        <div className="speech-bubble-p">
                            <p className={classP1}>Welcome to my portfolio!</p>
                            <p className={classP2}>My name is WY Chan.</p>
                            <p className={classP3}>I am self-studying web design & development.</p>
                            <p className={classP4}>I hope to become a web designer!</p>
                        </div>
                        <div className={classTriangle}></div>
                    </div>
                </div>
                <div className={classAbout}>
                <div className="info-box-gp">
                    <div className="info-box">
                        <h3>Information</h3>
                        <ul className="info-list">
                            <li><b>• Name:</b> <span className="p-text1">WY Chan</span></li>
                            <li><b>• Email:</b> <span className="p-text1">mailwychan@gmail.com</span></li>
                            <li><b>• Github:</b> <a className="p-text1 text-url" href="https://github.com/wy-chan" target="_blank">@wy-chan</a></li>
                            <li><b>• CodePen:</b> <a className="p-text1 text-url" href="https://codepen.io/wy-chan" target="_blank">@wy-chan</a></li>
                        </ul>
                    </div>
                    <div className="info-box exp-box">
                        <h3>Experiences</h3>
                        <p className="p-text1">Sorry, I have no related work experience, but I am willing to learn any new skills , knowledge, and applications related to web design and development.</p>
                    </div>
                </div>
                <p className="p-text skill-p">Here is a self-evaluation of my skills at design & development applications:</p>
                <div className="info-box-gp">
                    <div className="info-box skill-box">
                        <h3>Design</h3>
                        <ul>
                            <li>Photoshop
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar3">
                                        <div className="skill-bar-color"></div>
                                    </div>
                                </div>
                            </li>
                            <li>Illustrator
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar1"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                            <li>Figma
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar1"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="info-box skill-box">
                        <h3>fontend</h3>
                        <ul>
                             <li>HTML
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar3"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                            <li>CSS
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar3"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                            <li>JavaScript
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar2"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                            <li>React
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar1"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                            <li>jQuery
                                <div className="skill-bar-bg">
                                    <div className="skill-bar-content skill-bar1"><div className="skill-bar-color"></div></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="info-box-gp">
                    <div className="info-box hobby-box">
                        <h3>My Hobbies</h3>
                        <ul className="hobby-box-ul">
                        <li>
                            <div className="hobby-img hobby-img1"></div>
                            <p>Art & Crafts</p>
                        </li>
                        <li>
                            <div className="hobby-img hobby-img2"></div>
                            <p>Music</p>
                        </li>
                        <li>
                            <div className="hobby-img hobby-img3"></div>
                            <p>Cooking</p>
                        </li>
                        </ul>
                    </div>
                </div>
                </div>
            </section>
        )
    }
}
    

ReactDOM.render(<MyApp />, document.getElementById('myApp'));