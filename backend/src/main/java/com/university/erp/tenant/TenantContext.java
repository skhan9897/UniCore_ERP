package com.university.erp.tenant;

public class TenantContext {

    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();
    private static final ThreadLocal<String> CURRENT_CAMPUS = new ThreadLocal<>();

    public static void setCurrentTenant(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    public static String getCurrentTenant() {
        return CURRENT_TENANT.get();
    }

    public static void setCurrentCampus(String campusId) {
        CURRENT_CAMPUS.set(campusId);
    }

    public static String getCurrentCampus() {
        return CURRENT_CAMPUS.get();
    }

    public static void clear() {
        CURRENT_TENANT.remove();
        CURRENT_CAMPUS.remove();
    }
}
