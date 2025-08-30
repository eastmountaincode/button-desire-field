function MainHeader() {
    return (
        <div className="flex flex-col gap-2 p-2">
            <header className="mb-2">&lt;button&gt; &lt;desire&gt; &lt;forcefield&gt;</header>
            <details>
                <summary className="select-none cursor-pointer">about</summary>
                <p>
                    what is a button anyway?<br />
                    a button is an expression of what we would like to see happen in the world.<br />
                    a goal we would like to accomplish.<br />
                    an outcome we are striving for, a milestone.<br />
                    a wish.<br />
                    maybe we just want to chill out.<br />
                    what's up with 'wanting' anyway?
                </p>
            </details>
        </div>
    )
}
export default MainHeader;