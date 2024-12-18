

function AddUser(){

    

    return(
        <>
            <form>
                <div>
                    <div>
                        <label>First Name <input type="text" name="firstName" id="firstName"></input></label>
                    </div>
                    <div>
                        <label>Last Name <input type="text" name="lastName" id="lastName"></input></label>
                    </div>
                    <div>
                        <label>Email <input type="email" name="email" id="email"></input></label>
                    </div>
                    <div>
                        <label>Password <input type="password" name="password" id="password"></input></label>
                    </div>
                    <div>
                        <label>Role 
                        <select>
                            <option>
                                Member
                            </option>
                            <option>
                                Staff
                            </option>
                            <option>
                                Admin
                            </option>
                        </select>
                        </label>
                        
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddUser