package services;

import model.Point;

import javax.ejb.Stateful;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Stateful
public class PointService {
    List<Point> points = new ArrayList();

    @PersistenceContext
    private EntityManager em;

    public List<Point> getAll(){
        return points;
    }

    public void add(Point point) {
        points.add(point.roundValues());
    }
}
