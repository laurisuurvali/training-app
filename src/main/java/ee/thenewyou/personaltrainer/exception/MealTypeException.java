package ee.thenewyou.personaltrainer.exception;

public class MealTypeException extends Exception {

    public MealTypeException(String msg) {
        super(msg);
    }

    public MealTypeException(String msg, Throwable t) {
        super(msg, t);
    }
}
