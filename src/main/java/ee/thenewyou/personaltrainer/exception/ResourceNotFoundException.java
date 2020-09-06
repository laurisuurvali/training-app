package ee.thenewyou.personaltrainer.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends Exception {

    private final String exceptionDetail;

    public ResourceNotFoundException(String exceptionDetail) {
        super(exceptionDetail);
        this.exceptionDetail = exceptionDetail;
    }

    public String getExceptionDetail() {
        return exceptionDetail;
    }
}



