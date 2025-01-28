import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 


function AdminNavbar(){

    const { logout, role } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top" >
                <div className="container-fluid">

                    {/* Displays the user type on the nav bar base on their roles */}
                    {role == 'Admin' ? <Link className="navbar-brand text-warning" to="#">ADMIN</Link> : 
                        role == 'Staff' ? <Link className="navbar-brand text-warning" to="#">STAFF</Link> :
                        <                   Link className="navbar-brand text-warning" to="#">MEMBER</Link>}
                   
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse row" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 col-md-5">
                            <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home-page">Home</Link>
                            </li>

                            {/* Checks whether the currently log in user is an admin to display a tab on the nav bar to see all the users in the system */}
                            {role == 'Admin' && 
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/user-list">Users</Link>
                                </li>
                            }   
                            {role == 'Member' ? <li className="nav-item">
                            <Link className="nav-link active" to="/borrow-list">My Borrows</Link>
                            </li> :                         
                            <li className="nav-item">
                            <Link className="nav-link active" to="/borrow-list">Borrows</Link>
                            </li>
                            }
                            <li className="nav-item">
                            <Link className="nav-link active" to="/book-list-table">Books</Link>
                            </li>
                        </ul>
                        <form className="d-flex me-auto col-md-3"role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-success" type="submit">Search</button>
                        </form>
                    
                    </div>

                     <button className="btn btn-success" type="submit" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar