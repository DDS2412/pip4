package services;

import entities.UserRequest;
import model.User;
import org.hibernate.Session;
import utils.HibernateUtil;
import utils.PasswordHashing;

import javax.ejb.Singleton;

@Singleton
public class UserService {
    private final Session session;
    public UserService(){
        session = HibernateUtil.getSessionFactory().openSession();
    }

    public void saveUser(User user){
        session.getTransaction().begin();
        session.save(user);
        session.getTransaction().commit();
    }

    public boolean checkPassword(UserRequest userRequest) throws Exception{
        User user = session.get(User.class, userRequest.getLogin());

        if(user == null)
            return false;

        return PasswordHashing.check(userRequest.getPassword(), user.getPasswordHash());
    }

    public User getUser(String login){
        return session.get(User.class, login);
    }

    public boolean checkUserWithLogin(String login){
        return getUser(login) == null;
    }
}
