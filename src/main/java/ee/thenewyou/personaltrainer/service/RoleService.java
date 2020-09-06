package ee.thenewyou.personaltrainer.service;

import ee.thenewyou.personaltrainer.model.Role;

public interface RoleService {

    Role findByName(String name);

    void saveRole(Role role);
}
