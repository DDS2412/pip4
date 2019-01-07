package services;

import model.Point;
import org.hibernate.Session;
import utils.HibernateUtil;

import javax.ejb.Singleton;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class PointService {
    private final Session session;
    public PointService(){
        session = HibernateUtil.getSessionFactory().openSession();
    }

    public List<Point> getPointsByLogin(String login){
        return (List<Point>) session.
                createQuery("from model.Point where login = :login").
                setParameter("login", login).
                list();
    }

    List<Point> points = new ArrayList();

    public void addNewPoint(Point point) {

        session.getTransaction().begin();
        session.save(point);
        session.getTransaction().commit();
    }
}
