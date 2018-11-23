import React from 'react';

const Footer = () => {
    return (
        <footer className="footer footer-black  footer-white ">
            <div className="container-fluid">
                <div className="row">
                    <nav className="footer-nav">
                        <ul>
                            <li>
                                <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>
                            </li>
                            <li>
                                <a href="http://blog.creative-tim.com/" target="_blank">Blog</a>
                            </li>
                            <li>
                                <a href="https://www.creative-tim.com/license" target="_blank">Licenses</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="credits ml-auto">
                        <span className="copyright">©</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;