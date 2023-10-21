import { useState, useMemo, useCallback } from "react";
import DemoClassComponent from "../../_sharecomponents/DemoClassComponent";

import DemoRedux from "../../_sharecomponents/demoredux/DemoRedux";

import WithColor from "../../_sharecomponents/HOCComponnet/WithColor";
import Counter from "../../_sharecomponents/renderprops/Counter";
import OnMouseHover from "../../_sharecomponents/renderprops/OnMouseHover";

const Title = (props) => {
    return (
        <div>
            <h1>Random Color</h1>
            <h2>{props.subTitle}</h2>
            <h3>{props.number}</h3>
        </div>
    )
}

const Article = (props) => {
    return (
        <div>
            <h1>Article</h1>
            <h2>{props.articleTitle}</h2>
        </div>
    )
}

const TitleWithRandomColor = WithColor(Title);
const ArticleWithRandomColor = WithColor(Article);

const plusFive = (number) => {
    //console.log('Function plusFive called...')
    number = number + 5;
}

const Home = (props) => {
    const [user, setUser] = useState({
        username: 'Nguyen Van A',
        password: '123abc'
    })

    const _onClick = () => {
        //setUser({...user, username: 'Tran Van B'})
        setFlagShowDemoComponent(!flagShowDemoComponent)
    }

    const [flagShowDemoComponent, setFlagShowDemoComponent] = useState(true)

    const [number, setNumber] = useState(0);

    let changeNumber = plusFive(number);
    //useMemo
    //let changeNumber = useMemo(() => plusFive(number), [number]);

    //useCallBack
    const _changeNumber2 = useCallback((number) => {
        number = number * 2;
        console.log('Function change number 2 called...')
        console.log('number after changed: ' + number)
    }, [number])

    console.log('Home component rendered...');

    return (
        <div className="signup-container">
            <h1>Home demo redux</h1>

            <DemoRedux />
        </div>
    )
}

export default Home