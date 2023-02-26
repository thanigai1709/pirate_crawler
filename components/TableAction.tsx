import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, notification, Popconfirm, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableAction = ({ crawlData }) => {
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const handleOk = async () => {
		setConfirmLoading(true);
		let resp: any = await fetch(`/api/crawlers/delete?id=${crawlData.key}`, {
			method: "DELETE",
		});
		resp = await resp.json();
		if (resp.status) {
			router.reload();
		} else {
			notification.open({
				type: "error",
				message: "Something went wrong!",
				description: resp.message,
				duration: 2,
			});
		}
	};
	const handleCancel = () => {
		setOpen(false);
	};
	const showPopconfirm = () => {
		setOpen(true);
	};
	return (
		<Space>
			<Link href={`/dashboard/crawlers/${crawlData.key}`}>
				<Button type="primary" icon={<EditOutlined />} />
			</Link>

			<Popconfirm
				title="Delete the the API ?"
				description="You will not be able to recover it"
				open={open}
				onConfirm={handleOk}
				okButtonProps={{ loading: confirmLoading }}
				onCancel={handleCancel}
				placement={"left"}
				okText={"Yes"}
				okType={"danger"}
			>
				<Button type="primary" icon={<DeleteOutlined />} danger onClick={showPopconfirm} />
			</Popconfirm>
		</Space>
	);
};

export default TableAction;
