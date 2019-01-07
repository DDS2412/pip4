package controllers;

import entities.LoginRequest;
import entities.LoginResponse;
import entities.RegisterRequest;
import entities.RegisterResponse;
import model.User;
import services.PointService;
import services.UserService;
import utils.PasswordHashing;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;

@Path("/users")
public class UserController {
    @EJB
    private PointService pointService;
    @EJB
    private UserService userService;

    @Path("/register")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(RegisterRequest newUser)
        throws Exception
    {
        User user = new User();
        user.setUsername(newUser.getLogin());
        user.setCreatedDate(new Date());
        user.setPasswordHash(PasswordHashing.getSaltedHash(newUser.getPassword()));
        RegisterResponse response = new RegisterResponse();

        try{
            if(userService.checkUserWithLogin(user.getUsername())){
                userService.saveUser(user);
                response.setSuccess(true);
                response.setMessage("Регистрация успешно выполнена!");
            }
            else {
                response.setSuccess(false);
                response.setMessage("Пользователь с таким логином уже существует!");
            }
        }
        catch (Exception e){
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            return Response.status(200).
                    header("Access-Control-Allow-Origin", "*").
                    entity(response).
                    build();
        }
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                 entity(response).
                build();
    }

    @Path("/login")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(LoginRequest user){

        LoginResponse response = new LoginResponse();
        try {
            if(userService.checkPassword(user)) {
                response.setSuccess(true);
            }
            else{
                response.setSuccess(false);

                response.setMessage("Вы ввели некорректное сочетание логина и пароля!");
                return  Response.ok().
                        header("Access-Control-Allow-Origin", "*").
                        entity(response).
                        build();
            }
        }
        catch (Exception e){
            response.setSuccess(false);

            response.setMessage(e.getMessage());
            return  Response.status(200).
                    header("Access-Control-Allow-Origin", "*").
                    entity(response).
                    build();
        }

        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                entity(response).
                build();
    }
}
