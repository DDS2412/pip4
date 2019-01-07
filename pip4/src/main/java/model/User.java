package model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

public class User implements Serializable {
    private String username;
    private String passwordHash;
    private Date createdDate;
    private Set<Point> points;

    public User() { }

    public User(String login){
        this.username = login;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Set<Point> getPoints() {
        return points;
    }

    public void setPoints(Set<Point> points) {
        this.points = points;
    }
}
