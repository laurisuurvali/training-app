package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Role;
import ee.thenewyou.personaltrainer.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {


    final RoleRepository repository;

    @Autowired
    public RoleServiceImpl(RoleRepository repository) {
        this.repository = repository;
    }

    @Override
    public Role findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public void saveRole(Role role) {
        repository.save(role);
    }
}
