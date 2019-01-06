package controllers;

import entities.AddPointRequest;
import model.Point;
import services.PointService;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Singleton
@Path("/points")
public class PointController {
    @Inject
    private PointService pointService;

    @Path("/all")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAll(@QueryParam("login") String login){

        return Response.
                status(200).
                header("Access-Control-Allow-Origin", "*").
                entity(getPointsInJSON()).
                build();
    }

    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewPoint(AddPointRequest body){
        try{
            Point point = body.getPoint();
            point.setHit(
                    checkPoint(point.getX(), point.getY(), point.getR()));
            pointService.add(point, body.getLogin());
            return Response.
                    status(200).
                    header("Access-Control-Allow-Origin", "*").
                    entity(getPointsInJSON()).
                    build();
        }
        catch (Exception e){
            return Response.
                    status(404).
                    header("Access-Control-Allow-Origin", "*").
                    build();
        }


    }

    private JsonArray getPointsInJSON(){
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for (Point p : pointService.getAll()) {
            jsonArrayBuilder.add(
                    Json.createObjectBuilder().
                            add("x", p.getX()).
                            add("y", p.getY()).
                            add("r", p.getR()).
                            add("isHit", p.getHit())
            );
        }

        return  jsonArrayBuilder.build();
    }

    private boolean checkPoint(double x, double y, double r){
        return x<=0 && y<=0 && x*x+y*y<=r*r ||
                x>=0 && y>=0 && y<=(-1*x+0.5*r) ||
                x>=0 && y<=0 && x<=r && y >= -r/2;
    }
}
