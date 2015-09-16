var Socialnetworks = React.createClass({
    render: function () {
        return (
            <div>
                <p>
                    <a className="btn btn-primary btn-lg btn-block">Facebook <span className="fa fa-facebook"></span></a>
                </p>

                <p>
                    <a className="btn btn-info btn-lg btn-block">Twitter <span className="fa fa-twitter"></span></a>
                </p>

                <p>
                    <a className="btn btn-danger btn-lg btn-block">Google <span className="fa fa-google"></span></a>
                </p>
            </div>
        );
    }
});

React.render(<Socialnetworks/>, document.getElementById('socialLinks'));