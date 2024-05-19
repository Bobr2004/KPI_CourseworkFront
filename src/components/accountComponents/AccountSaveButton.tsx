import React from "react";
import AccountButton from "./AccountButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function AccountSaveButton({
   onClick
}: {
   onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
   return (
      <AccountButton onClick={onClick}>
         Збергти <FontAwesomeIcon icon={faFloppyDisk} />
      </AccountButton>
   );
}

export default AccountSaveButton;
