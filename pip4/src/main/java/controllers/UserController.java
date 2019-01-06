package controllers;

import entities.*;
import model.User;
import utils.PasswordHashing;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;

@Path("/users")
public class UserController {
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
            // TODO Работа с бд
            response.setSuccess(true);
            response.setMessage("Регистрация успешно выполнена!");
        }
        catch (Exception e){
            response.setSuccess(false);
            response.setMessage("Регистрация не выполнена!");
            return Response.status(500).
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
            // TODO Работа с бд
            if(user.getLogin().equals("admin") && user.getPassword().equals("admin")) {
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
            return  Response.status(500).
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
