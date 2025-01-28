import hero from '../assets/slider3.jpg'
import AdminNavbar from './Navbars/Navbar'

function HomePage(){

    return(
        <>
            <AdminNavbar />
            <div>
                <div>
                    <div
                        className="d-flex justify-content-center align-items-center text-center"
                        style={{ 
                            backgroundImage: `url(${hero})`, 
                            height: '80vh', 
                            width: '100%', 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center' 
                        }}
                        >
                        <div className="">
                            <h1 className='text-primary'>Enjoy your reading!</h1>
                        </div>
                    </div>
                </div>
                <div>
                    <footer className="bg-dark text-white text-center pt-5">
                        <div className="d-flex justify-content-around">
                            <div className="">
                                <h2 className="h1">Contact Us</h2>
                                <p className="fs-5 text-secondary"> +220 1234567</p>
                                <p className="fs-5 text-secondary"> admin@management_library.com</p>
                                <p className="fs-5 text-secondary"> UTG Faraba Campus, Faraba Banta, The Gambia</p>
                            </div>
                            
                            <div className="">
                                <h2 className="h1">About Us</h2>
                                <p className="fs-5 text-secondary">We are dedicated to providing the best service in the industry. Your safety and satisfaction are our top priorities.</p>
                            </div>
                        </div>
                        <div className="mt-5 pt-5 pb-2 border-top">
                            <div>
                               <p className="fs-5 text-secondary">&copy; 2024 Library Management.</p>
                               <p className="fs-5 text-secondary">Fatou Jagne &trade;</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default HomePage