package controllers;

import entities.AddPointRequest;
import model.Point;
import services.PointService;
import services.UserService;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/points")
public class PointController {
    @EJB
    private PointService pointService;
    @EJB
    private UserService userService;

    @Path("/all")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAll(@QueryParam("login") String login){
        List<Point> points;

        try {
            points = getPointsByLogin(login);
        }
        catch (Exception e){
            System.err.println("Что-то пошло не так на этапе получения точек по логину" + e);

            return Response.status(500).
                    header("Access-Control-Allow-Origin", "*").
                    build();
        }

        return Response.
                status(200).
                header("Access-Control-Allow-Origin", "*").
                entity(convertPointsInJSON(points)).
                build();
    }

    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewPoint(AddPointRequest body){
        try {
            Point point = body.getPoint();
            String login = body.getLogin();
            point.setChecked(
                    checkPoint(point.getX(), point.getY(), point.getR()));
            point.setUser(userService.getUser(login));

            pointService.addNewPoint(point);

            List<Point> points;

            try {
                points = getPointsByLogin(login);
            } catch (Exception e) {
                System.err.println("Что-то пошло не так на этапе получения точек по логину" + e);

                return Response.status(500).
                        header("Access-Control-Allow-Origin", "*").
                        build();
            }

            return Response.
                    status(200).
                    header("Access-Control-Allow-Origin", "*").
                    entity(convertPointsInJSON(points)).
                    build();
        }
        catch (Exception e){
            System.err.println("Что-то пошло не так на этапе добавления новой точки" + e);

            return Response.status(500).
                    header("Access-Control-Allow-Origin", "*").
                    build();
        }
    }

    private JsonArray convertPointsInJSON(List<Point> points){
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (Point p : points) {
            jsonArrayBuilder.add(
                    Json.createObjectBuilder().
                            add("x", p.getX()).
                            add("y", p.getY()).
                            add("r", p.getR()).
                            add("isHit", p.isChecked())
            );
        }

        return  jsonArrayBuilder.build();
    }

    private boolean checkPoint(double x, double y, double r){
        return x<=0 && y<=0 && x*x+y*y<=r*r ||
                x>=0 && y>=0 && y<=(-1*x+0.5*r) ||
                x>=0 && y<=0 && x<=r && y >= -r/2;
    }

    private List<Point> getPointsByLogin(String login){
        return (login == null ? new ArrayList<>() : pointService.getPointsByLogin(login));
    }
}
