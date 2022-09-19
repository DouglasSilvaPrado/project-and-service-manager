import { http } from "@/services/config";
import IProject from "~~/interface/IProject";

export default {
	getCategories: () => {
		return http.get("categories");
	},

	getProjects: () => {
        return http.get("projects");
	},

	getByIdProject: (id: string | string[]) => {
        return http.get(`projects/${id}`);
	},

	createProject: (project: IProject) => {
		return http.post("projects", project);
	},

	removeProject: (project: IProject) => {
		return http.delete(`projects/${project.id}`);
	},

	updateProject: (project: IProject) => {
		return http.put(`projects/${project.id}`, project);
	},

	createService: (project: IProject) => {
		return http.patch(`projects/${project.id}`, project);
	},

	removeService: (project: IProject) => {
		return http.patch(`projects/${project.id}`, project);
	}

};