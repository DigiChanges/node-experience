CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE users_has_roles (
  user_id UUID NOT NULL,
  role_id UUID NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES auth.users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE roles_has_permissions (
  role_id UUID NOT NULL,
  permission_id UUID NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE OR REPLACE FUNCTION get_authorization(field_user_id UUID, permission_name TEXT) RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM users_has_roles uhr
        JOIN roles_has_permissions rhp ON uhr.role_id = rhp.role_id
        JOIN permissions p ON rhp.permission_id = p.id
        WHERE uhr.user_id = field_user_id AND p.name = permission_name
    ) INTO has_permission;

    RETURN has_permission;
END;
$$ LANGUAGE plpgsql;
