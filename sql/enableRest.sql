BEGIN
    ORDS.ENABLE_SCHEMA(
        p_enabled => TRUE,
        p_schema => 'SCOTT',
        p_url_mapping_type => 'BASE_PATH',
        p_url_mapping_pattern => 'api',
        p_auto_rest_auth => FALSE
    );
    COMMIT;
END;
/
