"use client";
import { createContext, useState } from "react";
import axios from "../axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const AdminDataContext = createContext();

const AdminDataContextProvider = ({ children }) => {
	const router = useRouter();
	const [paginatePage, setPaginatePage] = useState(1);
	const [loginLoading, setLoginLoading] = useState(false);
	const [selectedCourses, setSelectedCourses] = useState([]);
	const [submitFileLoading, setSubmitFileLoading] = useState(false);
	const [registeredCourses, setRegisteredCourses] = useState({
		data: [],
		loading: false,
	});
	const [studentRegisteredCourses, setStudentRegisteredCourses] = useState({
		data: [],
		loading: false,
		total: 0,
		user: null,
		submitLoading: false,
	});

	const login = async (body) => {
		let errMsg = "";
		if (body.email && body.password) {
			setLoginLoading(true);
			try {
				const res = await axios.post("login", body);
				console.log("res.data", res.data);
				if (res.data.success) {
					router.push("/requests");
				} else {
					errMsg = res.data.error;
					console.log("errr", res.data.error);
				}
			} catch (err) {
				errMsg = "An error has occured. Please try again";
				console.log("login error", err);
			} finally {
				setLoginLoading(false);
			}
		}
		return errMsg;
	};

	const getUsersRegisteredCourses = () => {
		setRegisteredCourses((prev) => ({
			...prev,
			loading: true,
		}));
		axios
			.get(`users/requested-courses?page=${paginatePage}`)
			.then((res) => {
				if (res.data.success) {
					let courses = res.data.data;
					setRegisteredCourses((prev) => ({
						...prev,
						data: courses,
						total: res.data.total,
					}));
				}
			})
			.catch((err) => {
				console.log("getUsersRegisteredCourses error", err);
			})
			.finally((f) => {
				setRegisteredCourses((prev) => ({
					...prev,
					loading: false,
				}));
			});
	};

	const getStudentRegisteredCourses = (studentId) => {
		setStudentRegisteredCourses((prev) => ({
			...prev,
			loading: true,
		}));
		axios
			.get(`/user/${studentId}/registered-courses`)
			.then((res) => {
				if (res.data.success) {
					let courses = res.data.data;
					setStudentRegisteredCourses((prev) => ({
						...prev,
						data: courses,
						total: res.data.total,
						user: res.data.user,
					}));
				}
			})
			.catch((err) => {
				console.log("getStudentRegisteredCourses error", err);
			})
			.finally((f) => {
				setStudentRegisteredCourses((prev) => ({
					...prev,
					loading: false,
				}));
			});
	};

	const approveCourses = (studentId) => {
		setRegisteredCourses((prev) => ({
			...prev,
			submitLoading: true,
		}));
		axios
			.post(`user/${studentId}/register-courses`, { courses: selectedCourses })
			.then((res) => {
				if (res.data.success) {
					router.push("/requests");
				}
			})
			.catch((err) => {
				console.log("approveCourses error", err);
			})
			.finally((f) => {
				setRegisteredCourses((prev) => ({
					...prev,
					submitLoading: false,
				}));
			});
	};

	const submitFile = (file) => {
		setSubmitFileLoading(true);
		const form_data = new FormData();
		form_data.append("excel_file", file);
		axios
			.post("/results", form_data)
			.then((res) => {
				if (res.data.success) {
					router.push("/requests");
				}
			})
			.catch((err) => {
				console.log("submitFile error", err);
			})
			.finally((f) => {
				setSubmitFileLoading(false);
			});
	};

	const context = {
		state: {
			paginatePage,
			loginLoading,
			registeredCourses,
			selectedCourses,
			studentRegisteredCourses,
			submitFileLoading,
		},
		actions: {
			login,
			getUsersRegisteredCourses,
			setRegisteredCourses,
			setSelectedCourses,
			approveCourses,
			setPaginatePage,
			getStudentRegisteredCourses,
			setStudentRegisteredCourses,
			submitFile,
		},
	};

	return (
		<AdminDataContext.Provider value={context}>
			{children}
		</AdminDataContext.Provider>
	);
};

export default AdminDataContextProvider;
