package entities;

import model.Point;

import java.io.Serializable;

public class AddPointRequest implements Serializable {
    private Point point;
    private String login;

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
