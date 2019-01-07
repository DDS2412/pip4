package model;

import java.io.Serializable;

public class Point implements Serializable {
    private int id;
    private double x;
    private double y;
    private double r;
    private boolean checked;
    private User user;

    public Point(int id){
        this.id = id;
    }

    public Point(){}
    public Point(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public Point roundValues(){
        this.x = (double) Math.round(this.x * 10000) / 10000;
        this.y = (double) Math.round(this.y * 10000) / 10000;
        return this;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
