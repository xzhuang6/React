import React,{Component,} from 'react';


// 组件化 模块化 思想

// 不用带后缀名
import Header from './components/Header';
// 注意名称 大小写
import Main from "./components/Main";
import Footer from "./components/foot";

//引入css
import '../src/assets/css/index.css'
import '../src/assets/css/base.css'

class App extends Component{
  render() {
    return (
        <React.Fragment>
          <section className="todoapp">
            <Header />

            {/*This section should be hidden by default and shown when there are todos url*/}
            <Main />
            {/*This footer should hidden by default and shown when there are todos url*/}
            <Footer />
          </section>

        </React.Fragment>
    )
  }
}
export default App;
