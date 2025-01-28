package learn.domain;

import learn.data.UserRepository;
import learn.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public Optional<User> findById(java.lang.Long id){
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public Result<User> addUser(User user){
        Result<User> result = validate(user);

        if(!result.isSuccess()){
            return result;
        }
        user.setPassword(encoder.encode(user.getPassword()));
        result.setPayload(userRepository.save(user));
        return result;
    }

    public Result<User> updateUser(User updatedUser) {
        Result<User> result = validate(updatedUser);

        if (!result.isSuccess()) {
            return result;
        }

        java.lang.Long id = updatedUser.getUser_id();
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            result.setPayload(userRepository.save(existingUser));
        } else {
            result.addMessage("User ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<User> deleteById(java.lang.Long id){
        Result<User> result = new Result<>();
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            result.addMessage("User ID " + id + " not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<User> validate(User user) {
        Result<User> result = new Result<>();

        if (user == null) {
            result.addMessage("User cannot be null", ResultType.INVALID);
            return result;
        }

        if (user.getFirstName() == null || user.getFirstName().isBlank()) {
            result.addMessage("First name is required", ResultType.INVALID);
        }

        if (user.getLastName() == null || user.getLastName().isBlank()) {
            result.addMessage("Last name is required", ResultType.INVALID);
        }

        if (user.getEmail() == null || user.getEmail().isBlank()) {
            result.addMessage("Username is required", ResultType.INVALID);
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            result.addMessage("Password is required", ResultType.INVALID);
        }

        if (user.getRole() == null || user.getRole().isBlank()) {
            result.addMessage("Role is required", ResultType.INVALID);
        }

        if (!user.getRole().equalsIgnoreCase("admin") && !user.getRole().equalsIgnoreCase("staff") && !user.getRole().equalsIgnoreCase("member")) {
            result.addMessage("Role must be either 'admin' or 'staff' or 'member'", ResultType.INVALID);
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent() && !userRepository.findByEmail(user.getEmail()).get().getUser_id().equals(user.getUser_id())) {
            result.addMessage("Username already exists", ResultType.INVALID);
        }

        return result;
    }
}
