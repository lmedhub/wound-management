import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { ColorModeContext } from "../providers/colorTheme";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Header: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const colorMode = useContext(ColorModeContext);
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color={"background" as any}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/mywounds"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HealthHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href={"/mywounds"}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{t("mywounds")}</Typography>
                </MenuItem>
              </Link>
              <Link href="/wound/create">
                <MenuItem>
                  <Typography textAlign="center">{t("newwound")}</Typography>
                </MenuItem>
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link href={"/allwounds"}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography textAlign="center">{t("allwounds")}</Typography>
                  </MenuItem>
                </Link>
              )}
              {session?.user?.role === "ADMIN" && (
                <Link href={"/statistics"}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }} />
                      {t("statsbutton")}
                    </Typography>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/mywounds"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HealthHub
          </Typography>

          <Box
            sx={{
              color: "primary",
              gap: 1,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link href={"/mywounds"}>
              <Button color="inherit">{t("mywounds")}</Button>
            </Link>

            <Link href={"/wound/create"}>
              <Button color="inherit">{t("newwound")}</Button>
            </Link>

            {session?.user?.role === "ADMIN" && (
              <Link href={"/allwounds"}>
                <Button
                  startIcon={<AdminPanelSettingsIcon fontSize="small" />}
                  color="inherit"
                >
                  {t("allwounds")}
                </Button>
              </Link>
            )}

            {session?.user?.role === "ADMIN" && (
              <Link href={"/statistics"}>
                <Button
                  startIcon={
                    <AdminPanelSettingsIcon fontSize="small" color="inherit" />
                  }
                  color="inherit"
                >
                  {t("statsbutton")}
                </Button>
              </Link>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {session ? (
                  <Avatar alt={session.user.name} src={session.user.image} />
                ) : (
                  <Avatar alt="Profile" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <LanguageSwitcher />
              <MenuItem onClick={colorMode.toggleColorMode}>
                <Button>{t("changethemebutton")}</Button>
              </MenuItem>
              {session ? (
                <MenuItem
                  onClick={() =>
                    signOut({ redirect: false }).then(() => {
                      router.push("/api/auth/signin");
                    })
                  }
                >
                  <Typography textAlign="center">
                    <Button>Log out</Button>
                  </Typography>
                </MenuItem>
              ) : (
                <Link href="/api/auth/signin">
                  <MenuItem>
                    <Button>Log in</Button>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
