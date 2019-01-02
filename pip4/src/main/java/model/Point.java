package model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "point" , schema = "s242193")
public class Point implements Serializable {
    private int id;
    private double x;
    private double y;
    private double r;
    private boolean isHit;

    public Point(){}
    public Point(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public Point(int id, double x, double y, double r, boolean isHit){
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "gen")
    @SequenceGenerator(name = "gen", sequenceName = "shots_id_seq")
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "hit", nullable = true)
    public boolean getHit() {
        return isHit;
    }

    public void setHit(boolean hit) {
        isHit = hit;
    }

    @Basic
    @Column(name = "r", nullable = true, precision = 0)
    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    @Basic
    @Column(name = "y", nullable = true, precision = 0)
    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    @Basic
    @Column(name = "x", nullable = true, precision = 0)
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
}
