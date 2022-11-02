import axios from 'axios';

import * as Constants from "../components/SkillTrackerConstant";

const SKILL_TRACKER_QUERY_API_BASE_URL = Constants.HOST_URL + "/skill-tracker/api/v1/admin";
const SKILL_TRACKER_QUERY_API_USER_BASE_URL = Constants.HOST_URL + "/skill-tracker/api/v1/engineer/get-profile/";

const SKILL_TRACKER_UPDATE_PROFILE__API_BASE_URL = Constants.HOST_URL + '/skill-tracker/api/v1/engineer/update-profile/';


class SkillTrackerService {

    getEmployeeById(employeeId, token, roles) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        if (roles.includes("ROLE_ADMIN")) {
            return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Id/' + employeeId, {
                headers: headers
            });
        }
        return axios.get(SKILL_TRACKER_QUERY_API_USER_BASE_URL + employeeId, {
            headers: headers
        });

    }

    getEmployeeByName(employeeName, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Name/' + employeeName, {
            headers: headers
        });
    }

    getAllEmployee(token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/All/All', {
            headers: headers
        });
    }

    getEmployeeBySkill(skillName, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Skill/' + skillName, {
            headers: headers
        });
    }

    updateEmployeeBySkill(id, token, formBody) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.put(SKILL_TRACKER_UPDATE_PROFILE__API_BASE_URL + id, formBody, {
            headers: headers
        });
    }
}

export default new SkillTrackerService();